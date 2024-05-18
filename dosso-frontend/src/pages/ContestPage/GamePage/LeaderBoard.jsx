import React, { useState, useEffect } from "react"
import { Container, Row, Card, CardBody, Button } from "reactstrap"
let wheelImg = "Assets/images/fortune-wheel.png"
import axios from "axios"
import axiosRetry from "axios-retry"
import { Link, useLocation } from "react-router-dom"
const LeaderBoard = () => {
  const location = useLocation()
  const data = location.state
  const [rankingdata, setrankingdata] = useState([])
  const [loading, setLoading] = useState(true)
  // Create a new instance of axios
  const axiosInstance = axios.create()
  axiosRetry(axiosInstance, { retries: 3 })
  document.title = "Leaderboard"
  const RankingList = async () => {
    try {
      const response = await axiosInstance.get(
        "https://admin.dosso21.com/api/getpoints/" + data.id,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log("Final Data : ", response.data)
      setrankingdata(response.data)
    } catch (error) {
      console.log("error-&gt;", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    RankingList()
  }, [])

  if (loading) {
    return <div>Loading......</div>
  }
  return (
    <>
      <div className="page-content">
        <Container fluid className="">
          <Row>
            <div className="d-flex justify-content-between align-content-center my-2">
              <div className="fs-3 fw-bold  text-center">All Ranking</div>
              <Link to="/" className="">
                <Button className="btn btn-soft-secondary waves-effect waves-light btn-danger fw-bold ">
                  Back
                </Button>
              </Link>
            </div>
            {(rankingdata.slice(0, 20) || []).map((item, index) => (
              <Card
                className=" bg-white shadow-sm mb-2 rounded-3"
                key={item.id}
              >
                <CardBody className="d-flex p-2 justify-content-between align-items-center">
                  <div className="d-flex align-items-center ">
                    <div className="me-2 fs-3 border-end">
                      {index == 0
                        ? "🥇"
                        : index == 1
                        ? "🥈"
                        : index == 2
                        ? "🥉"
                        : index}
                    </div>
                    <div className="me-2 border border-1 border-secondary rounded-3">
                      <img
                        src={
                          item.studentprofile == null
                            ? wheelImg
                            : item.studentprofile
                        }
                        alt=""
                        className="img-fluid "
                        width={35}
                      />
                    </div>
                    <div className="me-2 fw-bold fs-5">{item.studentname} </div>
                  </div>
                  <div className="fw-bold fs-5"> {item.point} pts</div>
                </CardBody>
              </Card>
            ))}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default LeaderBoard
