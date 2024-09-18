import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FaSyncAlt } from "react-icons/fa"; // Importing an icon for the loading button

function Content() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null); // State to store a random quote

  const fetchdata = async () => {
    try {
      const response = await fetch("https://dummyjson.com/quotes");
      const data = await response.json();
      setQuotes(data.quotes); // Store array of quotes
    } catch (error) {
      console.error("Error fetching the quotes:", error);
    }
  };

  useEffect(() => {
    fetchdata(); // Fetch quotes when the component mounts
  }, []);

  // Function to generate a random quote
  const generateRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    }
  };

  // Automatically display a random quote when the page loads
  useEffect(() => {
    if (quotes.length > 0) {
      generateRandomQuote(); // Generate a random quote after quotes are fetched
    }
  }, [quotes]); // This will run whenever the `quotes` array is updated

  return (
    <div className="page-theme">
      <Container style={{ marginTop: "100px" }}>
        <Row className="justify-content-center">
          <Col md={6}>
            <h1 className="page-heading">Random Quotes</h1>
            {randomQuote && (
              <Card
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                  background:
                    "linear-gradient(270deg, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb)", // Initial gradient
                  backgroundSize: "400% 400%",
                  animation: "gradientAnimation 15s ease infinite", // Animation for the gradient
                  borderRadius: "15px",
                  border: "2px solid #fbc2eb", // Border color matching the theme
                }}
              >
                <Card.Body>
                  <Card.Text
                    style={{
                      fontFamily: "'Roboto', sans-serif",
                      fontWeight: "800",
                      color: "#fff", // White text for better contrast
                    }}
                  >
                    {randomQuote.quote}
                  </Card.Text>
                  <Card.Footer>
                    <small
                      className="text-muted"
                      style={{
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "800",
                      }}
                    >
                      - {randomQuote.author}
                    </small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            )}
            <div className="d-flex justify-content-center">
              <Button
                variant="primary"
                onClick={generateRandomQuote}
                className="custom-button"
              >
                <FaSyncAlt /> Load Random Quote
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS for the animated gradient background in the Card */}
      <style jsx>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .page-theme {
          background-color: #f5f5f5; /* Light background color for the entire page */
          color: #333; /* Dark text color for readability */
          font-family: "Roboto", sans-serif; /* Consistent font family */
        }

        .page-heading {
          text-align: center;
          font-size: 3rem; /* Larger font size for emphasis */
          margin-bottom: 30px;
          background: linear-gradient(
            90deg,
            #ff7e5f,
            #feb47b
          ); /* Gradient background for text */
          -webkit-background-clip: text; /* Clip the background to the text */
          -webkit-text-fill-color: transparent; /* Make the text color transparent to show gradient */
          font-weight: 700; /* Bold font weight */
          padding: 10px; /* Padding around the text */
        }

        .custom-button {
          background: linear-gradient(
            90deg,
            #ff7e5f,
            #feb47b
          ); /* Gradient background */
          border: none;
          color: #fff; /* White text for contrast */
          font-weight: 700;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .custom-button:hover {
          background: linear-gradient(
            90deg,
            #feb47b,
            #ff7e5f
          ); /* Gradient background on hover */
          transform: scale(1.05); /* Slightly enlarge button on hover */
        }
      `}</style>
    </div>
  );
}

export default Content;
