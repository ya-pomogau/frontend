import "./assets/styles/index.css";
import { AppRoutes } from "../pages";
import { withProviders } from "./providers";
import RequestCard from "../entities/request/ui/request-card";

function App() {
  const hard = {
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
    request: {
      requestId: 12222,
    },
  };
  return (
    <RequestCard user={hard.user} requestCardId={hard.request.requestId} />
  );
}
export default withProviders(App);
