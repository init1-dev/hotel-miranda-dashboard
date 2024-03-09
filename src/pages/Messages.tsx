import { Outlet, useLocation } from "react-router-dom";
import { messages } from "../helpers/Tabs/tabs";
import messagesData from '../Data/messages.json';
import Table, { Data } from "../components/Table/Table";
// import MessagesSlider from "../components/Dashboard/Messages/MessagesSlide";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { ActionButton, Archive, ButtonContainer, NewButton, Publish } from "../styled/Button";
import { TiArrowUnsorted } from "react-icons/ti";
import { format } from "date-fns";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import styled from "styled-components";
import { IoIosStar } from "react-icons/io";
import { MessageText, MessageTitle } from "../styled/Message";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { SpanContainer } from "../styled/Span";

const MySwal = withReactContent(Swal);

const messageStars = (row: number) => {
    const messageStars = [];
            
    for (let index = 0; index < row; index++) {
        messageStars.push(<Star key={index} />);
    }

    return <span>{messageStars}</span>;
}

function Messages() {
    const location=useLocation().pathname;

    return (
        <>
            {
                location === "/dashboard/messages"
                    ?   <>
                            {/* <MessagesSlider />
                            <br></br> */}
                            <TabsComponent section={messages}>
                                <NewButton>
                                    <TiArrowUnsorted />
                                    MESSAGE ORDER
                                </NewButton>
                            </TabsComponent>
                            <Table columns={messagesHeaders} data={messagesData} />
                        </>
                    : <Outlet />
            }
        </>
    );
}

const messagesHeaders = [
    {
        'label': 'ID / Name',
        display: (row: Data) => (
            <SpanContainer>
                <h4>{row.full_name}</h4>
                <small>
                    #{row.message_id}
                </small>
            </SpanContainer>
        )
    },
    {
        'label': 'Date',
        display: (row: Data) => format( new Date(`${row.date}`), 'MMM do, yyyy')
    },
    {
        'label': 'Contact',
        display: (row: Data) => (
            <CustomerDiv>
                <p>
                    <CiMail />
                    {row.email}
                </p>
                <p>
                    <MdOutlinePhone />
                    {row.phone}
                </p>
            </CustomerDiv>
        )
    },
    {
        'label': 'Comment',
        display: (row: Data) => {
            return (
                <>  
                    <p>
                        {}
                    </p>
    
                    <h3>
                        {messageStars(row.stars)} / <SmallText>
                                    {String(row.subject).slice(0,30)}..
                                </SmallText>
                    </h3>
    
                    <Message>
                        {String(row.message).slice(0,150)}..
                    </Message>
                </>
            )
        }
    },
    {
        'label': 'Actions',
        display : (row: Data) => {
            const MsgButton = (
                <ActionButton onClick={(event) => {
                    event.stopPropagation()
                    return (
                        MySwal.fire({
                            title: <MessageTitle>{row.full_name} <small>#{row.message_id}</small></MessageTitle>,
                            html: (
                                <>
                                    <MessageText><strong>Email:</strong> {row.email}</MessageText>
                                    <MessageText><strong>Phone:</strong> {row.phone}</MessageText>
                                    <MessageText><strong>Date:</strong> {format( new Date(`${row.date}`), 'MMM do, yyyy')}</MessageText>
                                    <MessageText><strong>Rating:</strong> { messageStars(row.stars) }</MessageText>
                                    <br />
                                    <MessageText><strong>Subject:</strong> {row.subject}</MessageText>
                                    <br />
                                    <MessageText><strong>Message:</strong> {row.message}</MessageText>
                                </>
                            ),
                            showConfirmButton: false
                        })
                    )
                }}>
                    Message
                </ActionButton>
            )

            if (row.archived === false) {
                return (
                    <ButtonContainer>
                        {MsgButton}
                        <Publish>Archive</Publish>
                    </ButtonContainer>
                )
            } else {
                return (
                    <ButtonContainer>
                        {MsgButton}
                        <Archive>Publish</Archive>
                    </ButtonContainer>
                )
            }
        }
    }
];

const CustomerDiv = styled.div`
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
        width: max-content;
    }

    svg {
        margin-right: 0.5rem;
    }
`

const Star = styled(IoIosStar)`
    color: #bebe0e;
`

const SmallText = styled.small`
    color: ${({ theme }) => theme.menuText};
`

const Message = styled.p`
    color: ${({ theme }) => theme.text};
    font-size: 13px;
`

export default Messages;