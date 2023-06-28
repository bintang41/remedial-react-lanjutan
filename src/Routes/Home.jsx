import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const Home = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: 'flex',
                justifyContent: 'center',
                background: `linear-gradient(to right, rgba(2,195,154,0,8), rgba(5, 102, 141,0,8)), url(https://cdn-images-1.medium.com/max/2000/1*YRINRZFr0E1FRJ4JpizEMw.jpeg)`
            }}
        >
            <div>
                <p>
                    Studi Independen
                </p>
                <p>
                    Kampus Merdeka
                </p>
                <p>
                    by RUANGGURU
                </p>
            </div>
            <div>
                <p>
                    Student Portal
                </p>
                <Button onClick={() => navigate("/student")}>
                    All Student
                </Button>
            </div>
        </div>
    )
};

export default Home;
