import React, { useState, useEffect } from "react";
import { Container, Row, Card, CardBody, Button, Col, Spinner, Modal, ModalHeader, ModalBody } from "reactstrap";
import config from "constants/config";
let wheelImg = "Assets/images/star.png"; // Correct import
import axios from "axios";
import axiosRetry from "axios-retry";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getLocalData } from "services/global-storage";

const LeaderBoard = () => {
  document.title = "Leaderboard";
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [modal, setModal] = useState(false);
  const [getPoints, setGetPoints] = useState([])

  const [rankingdata, setrankingdata] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosInstance = axios.create();
  axiosRetry(axiosInstance, { retries: 4 });

  const subjects = ["Sanskrit", "English", "Maths", "Hindi", "Science", "Sanskrit", "Social Science", "General Knowledge"];

  const toggle = () => {
    setModal(!modal);
  }

  // const getpoints = async (contestId) => {
  //   try {
  //     const response = await axios.get(
  //       config.apiUrl + "getpoints/" + contestId,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         }
  //       }
  //     );
  //     console.log("My getpoints Data : ", response.data);
  //     // setGetPoints(response.data);
  //     // Parse the spins from string to array
  //     const parsedData = response.data.map(item => ({
  //       ...item,
  //       spins: item.spins.split(',').map(Number),
  //     }));

  //     setGetPoints(parsedData);
  //   } catch (error) {
  //     console.log("error", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const RankingList = async () => {
    try {
      const response = await axiosInstance.get(config.apiUrl + "getpoints/" + data.id, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Ranking Data:", response.data);
      setrankingdata(response.data);

      const parsedData = response.data.map(item => ({
        ...item,
        spins: item.spins.split(',').map(Number),
      }));
      setGetPoints(parsedData);
      console.log("My getpoints Data : ", parsedData);

    } catch (error) {
      console.log("error->", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    RankingList(data.id);
    // getpoints(data.id)

  }, []);

  if (loading) {
    return <div className="page-content">
      <div className="card mt-5" aria-hidden="true">
        <div className="card-body">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4"></span>
          </p>
        </div>
      </div>
    </div>
  }

  const loggedInUserId = getLocalData("userId");
  const userRanks = rankingdata.filter(item => item.studentId === loggedInUserId);

  return (
    <>
      <div className="page-content">
        <Container fluid className="">
          <Row className="justify-content-center">
            <div className="col-lg-3 d-flex justify-content-between align-content-center my-2">
              <div className="fs-3 fw-bold text-center">Your Ranking</div>
              <Link to={-1} className="">
                <Button className="btn btn-soft-dark waves-effect waves-light fw-bold">
                  Back
                </Button>
              </Link>
            </div>
          </Row>
          {userRanks.length > 0 && (
            <Row className="justify-content-center my-3 p-0">
              <Col lg="3" className="p-0 border-bottom">
                {userRanks.map((userRank, index) => (
                  <Card className="bg-white shadow-sm mb-2 rounded-3" key={userRank.id}>
                    <CardBody className="d-flex p-2 border border-success text-white text-capitalize bg-success rounded-3 justify-content-between align-items-center">
                      <div className="d-flex align-items-center justify-content-evenly ">
                        <div className="me-2 fs-6">
                          # {rankingdata.findIndex(item => item.id === userRank.id) + 1}
                        </div>
                        <div className="me-2 border border-1 border-warning rounded">
                          <img
                            src={userRank.studentprofile !== null ? config.publicurl + 'profiles/' + userRank.studentprofile : wheelImg}
                            alt="studentprofile"
                            className="img-fluid rounded"
                            width={25}
                          />
                        </div>
                        <div className="me-2 fw-bold fs-6">{userRank.studentname}</div>
                      </div>
                      <div className="fw-bold fs-6">{userRank.point} pts</div>
                      <Button
                        onClick={() => toggle()}
                        className="btn btn-outline-dark bg-success btn-sm rounded fs-6 waves-effect waves-light fw-bold"
                      >
                        <span className="mdi mdi-format-list-bulleted"></span>
                      </Button>

                    </CardBody>
                  </Card>
                ))}
              </Col>
            </Row>
          )}
          <Row className="justify-content-center my-3 p-0">
            <Col lg="3" className="p-0">
              <div className="fs-3 fw-bold text-center">Top 20 Ranking</div>

              {rankingdata.slice(0, 20).map((item, index) => (
                <Card className="bg-white shadow-sm mb-2 rounded-3" key={item.id}>
                  <CardBody className="d-flex p-2 justify-content-between align-items-center text-capitalize">
                    <div className="d-flex align-items-center">
                      <div className="me-2 fs-6 ">
                        # {index === 0
                          ? "🥇"
                          : index === 1
                            ? "🥈"
                            : index === 2
                              ? "🥉"
                              : index + 1}
                      </div>
                      <div className="me-2 border border-1 border-warning rounded">
                        <img
                          src={item.studentprofile !== null ? config.publicurl + 'profiles/' + item.studentprofile : wheelImg}
                          alt="studentprofile"
                          className="img-fluid rounded"
                          width={25}
                        />
                      </div>
                      <div className="me-2 fw-bold fs-6">{item.studentname}</div>
                    </div>
                    <div className="fw-bold fs-6">{item.point} pts</div>
                  </CardBody>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>


        {/* <!-- Modal --> */}
        <Modal isOpen={modal} toggle={toggle} centered={true}>
          <ModalHeader toggle={toggle}>
            <span></span>Marksheet
          </ModalHeader>
          <ModalBody>
            {(getPoints || []).map((result, index) => (
              <div key={index}>
                {data.playcontestid === result.playcontestid && (
                  <div>
                    {result.spins.map((spin, i) => (
                      <div className="resultTab fs-4 mt-2 shadow px-2 d-flex justify-content-between" key={i}>
                        <span className="text-dark fw-bold">
                          {subjects[i] ? subjects[i] : `Round ${i + 1}`} :
                        </span>
                        <span className="fw-bolder text-success">{spin}</span>
                      </div>
                    ))}
                    <div className="text-center bg-dark text-warning mt-2 rounded fs-4 fw-bold">Total: {result.point} pts</div>
                  </div>
                )}
              </div>
            ))}

          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default LeaderBoard;
