import { Outlet } from "react-router-dom";
import { messages, orderBy } from "../helpers/Tabs/tabs";
import Table, { Data } from "../components/Table/Table";
import { TabsComponent } from "../components/Dashboard/Tabs/TabsComponent";
import { Archive, ButtonContainer, Publish } from "../styled/Button";
import { format } from "date-fns";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import styled, { ThemeContext } from "styled-components";
import { IoIosStar } from "react-icons/io";
import { MessageText, MessageTitle } from "../styled/Message";
import { SpanContainer } from "../styled/Span";
import { SectionSelect } from "../styled/Form";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import { selectMessages } from "../store/Messages/messagesSlice";
import { editMessage, getMessagesThunk } from "../store/Messages/messagesThunk";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Loader, Loading } from "../styled/Loading";
import { MessageData } from "../store/interfaces";
import CustomSwal from "../helpers/Swal/CustomSwal";
import { StatusButtonArchive, StatusButtonUnarchive } from "../components/Dashboard/Messages/MessagesSlide";
import { FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";

const messageStars = (row: number) => {
    const messageStars = [];
            
    for (let index = 0; index < row; index++) {
        messageStars.push(<Star key={index} />);
    }

    return <span>{messageStars}</span>;
}

function Messages() {
    const messagesSelect = orderBy.messages;
    const [isLoading, setIsLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | boolean | undefined>("All Messages");
    const [currentOrder, setCurrentOrder] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const theme = useContext(ThemeContext);

    const resetPage = () => {
        setCurrentPage(1);
    };

    const dispatch = useAppDispatch();
    const messagesData = useAppSelector(selectMessages);
    const filteredMessages = useMemo(() => {
        const all = (currentTab === "All Messages")
            ? messagesData.data
            : currentTab === "Archived"
                ? messagesData.data.filter((item) => item.archived === true)
                : messagesData.data.filter((item) => item.read === false)

        return [...all].sort((a, b) => {
            switch (currentOrder) {
                case 'older':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                default:
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        })
        
    }, [messagesData, currentTab, currentOrder])

    const initialFetch = useCallback(async () => {
        await dispatch(getMessagesThunk()).unwrap();
        setIsLoading(false);
    }, [dispatch])

    useEffect(() => {
        initialFetch()
    }, [initialFetch]);

    const action = async(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Data) => {
        e.stopPropagation();
        const isRead = row.read === true;
        if(!isRead) {
            dispatch(editMessage({row: row as MessageData, fieldToEdit: "read"}));
        }
        const swalProps = {
            title: <MessageTitle>{row.full_name} <small>#{row._id}</small></MessageTitle>,
                html: (
                    <>
                        <MessageText><strong>Email:</strong> {row.email}</MessageText>
                        <MessageText><strong>Phone:</strong> {row.phone}</MessageText>
                        <MessageText><strong>Date:</strong> {format( new Date(`${row.createdAt}`), 'MMM do, yyyy')}</MessageText>
                        <MessageText><strong>Rating:</strong> { messageStars(Number(row.stars)) }</MessageText>
                        <br />
                        <MessageText><strong>Subject:</strong> {row.subject}</MessageText>
                        <br />
                        <MessageText><strong>Message:</strong> {row.message}</MessageText>
                    </>
                ),
                showConfirmButton: false
        }
        await CustomSwal({data: swalProps, theme: theme})
    };

    const messagesHeaders = [
        {
            'label': 'ID / Name',
            display: (row: Data) => (
                <SpanContainer>
                    <h4>{row.full_name}</h4>
                    <small>
                        #{row._id}
                    </small>
                </SpanContainer>
            )
        },
        {
            'label': 'Date',
            display: (row: Data) => format( new Date(`${row.createdAt}`), 'MMM do, yyyy')
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
                            {messageStars(Number(row.stars))} / <SmallText>
                                                            {String(row.subject).slice(0,30)}..
                                                        </SmallText>
                        </h3>
        
                        <Message>
                            {String(row.message).slice(0,50)}..
                        </Message>
                    </>
                )
            }
        },
        {
            'label': 'Read',
            display: (row: Data) => {
                return (
                    <>  
                        <p>{
                            row.read
                                ?  <StatusButtonArchive>
                                        <FaRegCheckCircle />
                                </StatusButtonArchive>
                                : <StatusButtonUnarchive>
                                <FaRegTimesCircle />
                            </StatusButtonUnarchive>
                        }</p>
                    </>
                )
            }
        },
        {
            'label': 'Actions',
            display : (row: Data) => {
                const employeeRow = row as MessageData;
                if (row.archived === false) {
                    return (
                        <ButtonContainer>
                            <Publish onClick={(e) => {
                                e.stopPropagation();
                                dispatch(editMessage({row: employeeRow, fieldToEdit: "archived"}));
                            }}>Archive</Publish>
                        </ButtonContainer>
                    )
                } else {
                    return (
                        <ButtonContainer>
                            <Archive onClick={(e) => {
                                e.stopPropagation();
                                dispatch(editMessage({row: employeeRow, fieldToEdit: "archived"}));
                            }}>Publish</Archive>
                        </ButtonContainer>
                    )
                }
            }
        }
    ];

    if(isLoading) {
        return (
            <Loading>
                <Loader />
            </Loading>
        )
    }

    return (
        <>
            {
                location.pathname === "/dashboard/messages"
                    ?   <>
                            <TabsComponent 
                                section={messages}
                                currentTab={currentTab}
                                setCurrentTab={setCurrentTab} 
                                resetPage={resetPage}
                            >
                                <ButtonContainer>
                                    <SectionSelect 
                                        onChange={(e) => setCurrentOrder(e.target.value)}
                                        name="room-type" 
                                        id="room-type" 
                                        required>
                                        {
                                            messagesSelect.map((type, index) => {
                                                return <option key={index} value={type.accesor}>{type.label}</option>
                                            })
                                        }
                                    </SectionSelect>
                                </ButtonContainer>
                            </TabsComponent>
                            <Table
                                columns={messagesHeaders}
                                data={filteredMessages}
                                action={action}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </>
                    : <Outlet />
            }
        </>
    );
}

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

export const Star = styled(IoIosStar)`
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