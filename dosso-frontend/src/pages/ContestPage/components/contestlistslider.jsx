import React from 'react';
import Flicking from "@egjs/react-flicking";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Progress } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';

let rewardImg = "https://cdn-icons-png.flaticon.com/128/2282/2282531.png";
let magicImg = "https://cdn-icons-png.flaticon.com/512/4338/4338712.png";
let spinsImg = "https://cdn-icons-png.flaticon.com/512/8146/8146784.png";
let offerImg = "https://cdn-icons-png.flaticon.com/512/776/776627.png";
let tackerImg = "https://cdn-icons-png.flaticon.com/512/5694/5694967.png";
let scholarshipImg = "https://cdn-icons-png.flaticon.com/512/3769/3769879.png";

const contestData = [
    {
        "id": 1,
        "img": rewardImg,
        "title": "MEGA CONTEST",
        "remainingTime": "15 min",
        "seats": 1000,
        "totalRound": 2,
        "entryFees": "₹1",
        "firstPrize": "2 Crore",
        "status": "New"
    },
    {
        "id": 2,
        "img": magicImg,
        "title": "Contest 2",
        "remainingTime": "45 min",
        "seats": 1000,
        "totalRound": 1,
        "entryFees": "₹1",
        "firstPrize": "1 Crore",
        "status": ""

    },
    {
        "id": 3,
        "img": spinsImg,
        "title": "Contest 3",
        "remainingTime": "2 hrs",
        "seats": 1000,
        "totalRound": 3,
        "entryFees": "₹1",
        "firstPrize": "90 Lakhs",
        "status": ""

    },

];

const Contestlistslider = ({ title }) => {

    const navigate = useNavigate();

    const handleClick = (contest) => {
        navigate("/rounds", { state: contest });
    };

    return (
        <div className="">
            <Row className="my-2">
                <Col className="d-grid align-content-center">
                    <div className='d-flex justify-content-between align-content-center'>
                        <div className="fs-3 fw-bold text-black text-uppercase">{title}</div>
                        <Link to="/history" className="">
                            <button className="btn btn-soft-secondary waves-effect waves-light  fw-bold ">
                                History
                            </button>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Flicking
                align="prev"
                horizontal={false}
                circular={false}
                className="flicking-wrapper"
                resizeOnContentsReady={true}
                renderOnlyVisible={true}
            // panelsPerView={3}
            >
                {(contestData || []).map((item, key) => (
                    <div className="flicking-viewport vertical" key={item.id}>
                        <div className="flicking-camera">
                            <Card className='mb-3  flicking-panel shadow border border-secondary rounded-3'>
                                <CardHeader className='bg-white rounded-3 border-bottom d-flex justify-content-between'>

                                    <div className="mb-0 text-muted">
                                        <i className="bx bx-time-five text-body me-1"></i>
                                        {item.remainingTime}
                                    </div>
                                    {/* <div className="mb-0 text-muted">
                                        <span>
                                            Round: {item.seats}/{item.totalRound}
                                        </span>
                                        <b>{item.round}</b>
                                    </div> */}
                                    <div className="mb-0">
                                        <span className='badge text-bg-success fs-6'>{item.status}</span>
                                    </div>

                                </CardHeader>
                                <CardBody className="p-3">

                                    <div className="text-start">
                                        <div className=' d-flex justify-content-between'>
                                            {/* <img src={item.img} alt="" className="avatar-sm" /> */}
                                            <div>
                                                <div className=" fw-bolder fs-3 text-black">
                                                    {item.title}
                                                </div>
                                                <div className="text-muted">Winning reward</div>
                                            </div>
                                            <div>Entry <s>₹50</s>
                                                <div className="badge text-bg-success   d-grid justify-content-center">
                                                    <span className='text-center round-text  text-white'>{item.entryFees}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pb-3 pt-2">
                                            <Progress
                                                animated
                                                className="mb-1"
                                                color="danger"
                                                max="1000"
                                                value={750}

                                                style={{
                                                    height: '5px'
                                                }}
                                            >
                                            </Progress>
                                            <div className="float-start text-danger progress-text fw-bold">
                                                250 Spots left
                                            </div>
                                            <div className="float-end text-muted progress-text">
                                                1000 Spots
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <button onClick={() => handleClick(item)} className="btn btn-danger shadow w-100 fw-bold fs-5 text-uppercase  rounded-5 ">
                                                Join Contest
                                            </button>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter className=' d-flex justify-content-between'>
                                    <div className="mb-0 text-muted">
                                        <i className='bx bx-trophy text-body me-1'></i>
                                        {item.firstPrize}
                                    </div>

                                    <div className="mb-0 text-muted">
                                        <b>{item.seats}</b>
                                        <span className='ms-1'>
                                            participants
                                        </span>
                                    </div>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                ))}
            </Flicking>
        </div>
    );
}

export default Contestlistslider;
