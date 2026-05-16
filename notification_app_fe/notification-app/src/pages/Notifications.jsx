import axios from "axios";

import {
    useEffect,
    useState
} from "react";

import {
    Select,
    MenuItem,
    Button
} from "@mui/material";

import NotificationCard
from "../components/NotificationCard";


function Notifications() {

    const [notifications, setNotifications] =
    useState([]);

    const [type, setType] =
    useState("");

    const [page, setPage] =
    useState(1);

    const limit = 5;


    useEffect(() => {

        loadData();

    }, [page, type]);


    async function loadData() {

        try {

            let url =
            `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;

            if (type !== "") {

                url +=
                `&notification_type=${type}`;

            }

            const response =
            await axios.get(url);

            console.log("FULL RESPONSE");
            console.log(response);

            console.log("DATA");
            console.log(response.data);


            if (Array.isArray(response.data)) {

                setNotifications(
                    response.data
                );

            }

            else if (
                Array.isArray(
                    response.data.notifications
                )
            ) {

                setNotifications(
                    response.data.notifications
                );

            }

            else {

                console.log(
                    "Unexpected format"
                );

                setNotifications([]);

            }

        }

        catch (error) {

            console.log("ERROR");

            console.log(error);

        }

    }


    return (

        <div>

            <h1>
                All Notifications
            </h1>


            <Select
                value={type}
                onChange={(e) =>
                    setType(e.target.value)
                }
                displayEmpty
                style={{ width: "200px" }}
            >

                <MenuItem value="">
                    All
                </MenuItem>

                <MenuItem value="Event">
                    Event
                </MenuItem>

                <MenuItem value="Result">
                    Result
                </MenuItem>

                <MenuItem value="Placement">
                    Placement
                </MenuItem>

            </Select>

            <br />
            <br />

            {

                notifications.length > 0

                ?

                notifications.map((item) => (

                    <NotificationCard
                        key={item.id}
                        data={item}
                    />

                ))

                :

                <h2>
                    No Notifications Found
                </h2>

            }

            <br />

            <Button
                disabled={page === 1}
                onClick={() =>
                    setPage(page - 1)
                }
            >

                Previous

            </Button>


            <Button
                onClick={() =>
                    setPage(page + 1)
                }
                style={{
                    marginLeft: "10px"
                }}
            >

                Next

            </Button>

        </div>

    );

}

export default Notifications;