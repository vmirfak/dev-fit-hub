import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import ProtectedLayout from "./components/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";

import MyDashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import Registration from "./pages/Authentication/Registration";
import FoodPlans from "./pages/Athlete/Diet/FoodPlans";
import ExercisePlans from "./pages/Athlete/Exercise/ExercisePlans";
import FoodPlanCreation from "./pages/Professional/Diet/FoodPlanCreation";
import ExercisepPlanCreation from "./pages/Professional/Exercise/ExercisePlanCreation";
import EvaluationHistory from "./pages/Professional/Evaluations/EvaluationHistory";
import NewEvaluation from "./pages/Professional/Evaluations/NewEvaluation";
import Chat from "./pages/Common/Chat";
import Recipes from "./pages/Common/Diet/Recipes";
import ShoppingList from "./pages/Common/Diet/ShoppingList";
import RecoverPassword from "./pages/Authentication/RecoverPassword";
import NewDietPlan from "./pages/Professional/Diet/NewDietPlan";
import ErrorPage from "./pages/Error/ErrorPage";
import NewExercisePlan from "./pages/Professional/Exercise/NewExercisePlan";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ClientsOverview from "./pages/Professional/Clients/ClientsOverview";
import FoodPlanOverview from "./pages/Professional/Diet/FoodPlanOverview";
import ExercisePlanOverview from "./pages/Professional/Exercise/ExercisePlanOverview";
import IndividualClientOverview from "./pages/Professional/Clients/IndividualClientOverview";
import FoodPlanDetails from "./pages/Professional/Diet/FoodPlanDetails";
import ExercisePlanDetails from "./pages/Professional/Exercise/ExercisePlanDetails";
import ProEvaluations from "./pages/Professional/Evaluations/ProEvaluations";
import AthleteProgress from "./pages/Professional/Exercise/AthleteProgressOverview";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Login setLoading={setLoading} />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/recover" element={<RecoverPassword />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
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
            path="/admindashboard"
            element={
              <>
                <PageTitle title="Admin Dashboard" />
                <AdminDashboard />
              </>
            }
          />
          <Route
            path="/newdietplan"
            element={
              <>
                <PageTitle title="New Diet Plan" />
                <NewDietPlan />
              </>
            }
          />
          <Route
            path="/newexerciseplan"
            element={
              <>
                <PageTitle title="New Exercise Plan" />
                <NewExercisePlan />
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
            path="/clients"
            element={
              <>
                <PageTitle title="Clients Overview" />
                <ClientsOverview />
              </>
            }
          />
          <Route
            path="/dietplandetails/:id"
            element={
              <>
                <PageTitle title="Plano de Nutrição - Detalhes" />
                <FoodPlanDetails />
              </>
            }
          />
          <Route
            path="/exerciseplandetails/:id"
            element={
              <>
                <PageTitle title="Plano de Treino - Detalhes" />
                <ExercisePlanDetails />
              </>
            }
          />
          <Route
            path="/foodplanoverview/:id"
            element={
              <>
                <PageTitle title="Plano de Nutrição" />
                <FoodPlanOverview />
              </>
            }
          />
          <Route
            path="/exerciseplanoverview/:id"
            element={
              <>
                <PageTitle title="Plano de Exercício" />
                <ExercisePlanOverview />
              </>
            }
          />
          <Route
            path="/clientoverview/:id"
            element={
              <>
                <PageTitle title="Overview Client" />
                <IndividualClientOverview />
              </>
            }
          />
          <Route
            path="/evaluations"
            element={
              <>
                <PageTitle title="Avaliações Pendentes" />
                <ProEvaluations />
              </>
            }
          />
          <Route
            path="/athleteprogress"
            element={
              <>
                <PageTitle title="Progresso do Atleta" />
                <AthleteProgress />
              </>
            }
          />
        </Route>

        {/* Fallback for Undefined Routes */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
