import axios from "axios";

import {
    useEffect,
    useState
} from "react";

import NotificationCard
from "../components/NotificationCard";


function Priority() {

    const [notifications, setNotifications] =
    useState([]);

    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            const response =
            await axios.get(
                "http://4.224.186.213/evaluation-service/notifications?limit=3"
            );

            console.log(response.data);

            setNotifications(

                response.data.notifications ||
                response.data ||
                []

            );

        }

        catch (error) {

            console.log(error);

        }

    }


    return (

        <div>

            <h1>
                Priority Notifications
            </h1>

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

                <h3>
                    No Notifications Found
                </h3>

            }

        </div>

    );

}

export default Priority;