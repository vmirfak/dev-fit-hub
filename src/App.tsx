import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MyDashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import FeedBack from "./pages/Feedback";
import FAQ from "./pages/Faqs";
import FoodPlans from "./pages/FoodPlans";
import ExercisePlans from "./pages/ExercisePlans";
import FoodPlanCreation from "./pages/FoodPlanCreation";
import ExercisepPlanCreation from "./pages/ExercisePlanCreation";
import EvaluationHistory from "./pages/EvaluationHistory";
import NewEvaluation from "./pages/NewEvaluation";
import Chat from "./pages/Chat";
import Recipes from "./pages/Recipes";
import ShoppingList from "./pages/ShoppingList";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route index element={<Login setLoading={setLoading} />} />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard" />
              <MyDashboard />
            </>
          }
        />
        <Route
          path="/registration"
          element={
            <>
              <PageTitle title="Registration" />
              <Registration />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <PageTitle title="Chat" />
              <Chat />
            </>
          }
        />
        <Route
          path="/shoppinglist"
          element={
            <>
              <PageTitle title="ShoppingList" />
              <ShoppingList />
            </>
          }
        />
        <Route
          path="/recipes"
          element={
            <>
              <PageTitle title="Recipes" />
              <Recipes />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/myexerciseplans"
          element={
            <>
              <PageTitle title="Exercise Plans" />
              <ExercisePlans />
            </>
          }
        />
        <Route
          path="/myfoodplans"
          element={
            <>
              <PageTitle title="Food Plans" />
              <FoodPlans />
            </>
          }
        />
        <Route
          path="/newevaluation"
          element={
            <>
              <PageTitle title="New Evaluation" />
              <NewEvaluation />
            </>
          }
        />
        <Route
          path="/evaluationhistory"
          element={
            <>
              <PageTitle title="Evaluation History" />
              <EvaluationHistory />
            </>
          }
        />
        <Route
          path="/perscribedietplan"
          element={
            <>
              <PageTitle title="Perscribe Diet" />
              <FoodPlanCreation />
            </>
          }
        />
        <Route
          path="/perscribeexerciseplan"
          element={
            <>
              <PageTitle title="Perscribe Exercise" />
              <ExercisepPlanCreation />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings" />
              <Settings />
            </>
          }
        />
        <Route
          path="/feedback"
          element={
            <>
              <PageTitle title="Feedback" />
              <FeedBack />
            </>
          }
        />

        <Route
          path="/faq"
          element={
            <>
              <PageTitle title="FAQs" />
              <FAQ />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;