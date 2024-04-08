import React from "react";
import { Row, Col, Card, Button } from "reactstrap"

//Import Images
let wheelImg = "/assets/images/fortune-wheel.png"

function CardWelcome({ title }) {
  return (
    <React.Fragment>
      <Col xl="12">
        <Row className="my-2">
          <Col className="d-grid align-content-center">
            <div className="fs-5 fw-bold text-white">{title}</div>
          </Col>
          <Col>
            <div className="fs-6 float-end rounded-pill border text-danger py-2 px-3 text-white">
              Spin Remaining: 7
            </div>
          </Col>
        </Row>
        <Card className="bg-gradient">
          <div>
            <Row>
              <Col xs="7" className="d-grid align-content-center">
                <div className="text-warning p-3">
                  <h1 className="text-warning">Spin To Win</h1>
                  <h6>Earn Many Scholarships</h6>
                  <div>
                    <Button className="btn btn-soft-warning waves-effect waves-light btn-secondary fw-bold"> Play Now</Button>
                  </div>
                </div>

              </Col>
              <Col xs="5" className="align-self-end pt-3 py-3 pb-0">
                <img src={wheelImg} alt="" className="img-fluid" />
              </Col>

            </Row>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default CardWelcome;