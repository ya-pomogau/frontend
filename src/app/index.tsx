import "./assets/styles/index.css";
import RequestCardList from "entities/request/ui/request-card-list";
import { AppRoutes } from "../pages";
import { withProviders } from "./providers";

function App() {
  const cards = [
    {
      requestCardId: "ewew1221212",
      user: {
        userAvatar:
          "https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg",
        userId: 1,
        userName: "TESTOV Test Testovich",
        userPhoneNumber: "7 777 777 77 77",
        info: {
          keys: 0,
          completedTasks: 12,
          score: 1000,
        },
      },
    },
    {
      requestCardId: "ewew1221212",
      user: {
        userAvatar:
          "https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg",
        userId: 2,
        userName: "TESTOV Test Testovich",
        userPhoneNumber: "7 777 777 77 77",
        info: {
          keys: 1,
          completedTasks: 22,
          score: 400,
        },
      },
    },
    {
      requestCardId: "ewew1221212",
      user: {
        userAvatar:
          "https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg",
        userId: 3,
        userName: "TESTOV Test Testovich",
        userPhoneNumber: "7 777 777 77 77",
        info: {
          keys: 0,
          completedTasks: 0,
          score: 0,
        },
      },
    },
    {
      requestCardId: "ewew1221212",
      user: {
        userAvatar:
          "https://kartinkived.ru/wp-content/uploads/2021/12/avatarka-dlya-vatsapa-marshmellou.jpg",
        userId: 4,
        userName: "TESTOV Test Testovich",
        userPhoneNumber: "7 777 777 77 77",
        info: {
          keys: 0,
          completedTasks: 12,
          score: 1000,
        },
      },
    },
  ];
  return <RequestCardList cards={cards} />;
}
export default withProviders(App);
