import React from 'react';
import Flicking from "@egjs/react-flicking";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Link } from 'react-router-dom';

let rewardImg = "https://cdn-icons-png.flaticon.com/128/2282/2282531.png";
let magicImg = "https://cdn-icons-png.flaticon.com/512/4338/4338712.png";
let spinsImg = "https://cdn-icons-png.flaticon.com/512/8146/8146784.png";
let offerImg = "https://cdn-icons-png.flaticon.com/512/776/776627.png";
let tackerImg = "https://cdn-icons-png.flaticon.com/512/5694/5694967.png";
let scholarshipImg = "https://cdn-icons-png.flaticon.com/512/3769/3769879.png";

const jobVacancy = [
    {
        id: 1,
        img: rewardImg,
        title: "Contest 1",
        remainingTime: "15 min",
        seats: 80,
        round: 2
    },
    {
        id: 2,
        img: magicImg,
        title: "Contest 2",
        remainingTime: "45 min",
        seats: 56,
        round: 1
    },
    {
        id: 3,
        img: spinsImg,
        title: "Contest 3",
        remainingTime: "2 hrs",
        seats: 21,
        round: 3
    },
    {
        id: 4,
        img: offerImg,
        title: "Contest 4",
        remainingTime: "5 hrs",
        seats: 34,
        round: 1
    },
    {
        id: 5,
        img: tackerImg,
        title: "Contest 5",
        remainingTime: "8 hrs",
        seats: 54,
        round: 2
    },
    {
        id: 6,
        img: scholarshipImg,
        title: "Contest 6",
        remainingTime: "13 hrs",
        seats: 65,
        round: 1
    },
];

const Contestlistslider = ({ title }) => {
    return (
        <div className="">
            <Row className="my-2">
                <Col className="d-grid align-content-center">
                    <div className='d-flex justify-content-between align-content-center'>
                        <div className="fs-3 fw-bold text-info text-uppercase">{title}</div>
                        <Link to="/history" className="">
                            <Button className="btn btn-soft-info waves-effect waves-light btn-info fw-bold ">
                                History
                            </Button>
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
                {(jobVacancy || []).map((item, key) => (
                    <div className="flicking-viewport vertical" key={item.id}>
                        <div className="flicking-camera">
                            <Card className='mb-2 border flicking-panel'>

                                <CardBody className="">
                                    <div className="d-flex justify-content-between">
                                        <div className="mb-0 text-muted">
                                            <i className="bx bx-time-five text-body me-1"></i>
                                            {item.remainingTime}
                                        </div>
                                        <div className="mb-0 text-muted">
                                            <span>
                                                Round: {item.round}
                                            </span>
                                            {/* <b>{item.round}</b> */}
                                        </div>
                                        <div className="mb-0 text-muted">
                                            <b>{item.seats}</b>
                                            <span>
                                                /100 Seats
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-star mt-4">
                                        <img src={item.img} alt="" className="avatar-sm" />
                                        <div className='mt-3 d-flex justify-content-between'>
                                            <div>
                                                <div className=" fw-bold fs-3 text-warning">
                                                    {item.title}
                                                </div>
                                                <div className="text-muted">Winning reward</div>
                                            </div>
                                            <Link to="/rounds" className="">
                                                <Button className="btn btn-soft-success waves-effect waves-light btn-success fw-bold text-uppercase">
                                                    Enter
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                ))
                }
            </Flicking>
        </div>
    );
}

export default Contestlistslider;
