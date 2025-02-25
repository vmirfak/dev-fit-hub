import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PageTitle from "../components/PageTitle";
import ProtectedRoute from "./ProtectedRoute";
import MyDashboard from "../pages/Dashboard/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import Login from "../pages/Common/Authentication/Login";
import Registration from "../pages/Common/Authentication/Registration";
import FoodPlans from "../pages/Athlete/Diet/FoodPlans";
import ExercisePlans from "../pages/Athlete/Exercise/ExercisePlans";
import FoodPlanCreation from "../pages/Professional/Diet/FoodPlanCreation";
import ExercisepPlanCreation from "../pages/Professional/Exercise/ExercisePlanCreation";
import EvaluationHistory from "../pages/Professional/Evaluations/EvaluationHistory";
import NewEvaluation from "../pages/Professional/Evaluations/NewEvaluation";
import Chat from "../pages/Common/Chat";
import Recipes from "../pages/Common/Diet/Recipes";
import ShoppingList from "../pages/Common/Diet/ShoppingList";
import RecoverPassword from "../pages/Common/Authentication/RecoverPassword";
import NewDietPlan from "../pages/Professional/Diet/NewDietPlan";
import ErrorPage from "../pages/Common/Error/ErrorPage";
import NewExercisePlan from "../pages/Professional/Exercise/NewExercisePlan";
import ClientsOverview from "../pages/Professional/Clients/ClientsOverview";
import FoodPlanOverview from "../pages/Professional/Diet/FoodPlanOverview";
import ExercisePlanOverview from "../pages/Professional/Exercise/ExercisePlanOverview";
import IndividualClientOverview from "../pages/Professional/Clients/IndividualClientOverview";
import FoodPlanDetails from "../pages/Professional/Diet/FoodPlanDetails";
import ExercisePlanDetails from "../pages/Professional/Exercise/ExercisePlanDetails";
import ProEvaluations from "../pages/Professional/Evaluations/ProEvaluations";
import AthleteProgress from "../pages/Professional/Exercise/AthleteProgressOverview";
import DevOverview from "../pages/Dev/DevOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public Routes
      { path: "", element: <Login /> },
      { path: "registration", element: <Registration /> },
      { path: "recover", element: <RecoverPassword /> },

      // Protected Routes
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <PageTitle title="Dashboard" />
            <MyDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admindashboard",
        element: (
          <ProtectedRoute>
            <PageTitle title="Admin Dashboard" />
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "newdietplan",
        element: (
          <ProtectedRoute>
            <PageTitle title="New Diet Plan" />
            <NewDietPlan />
          </ProtectedRoute>
        ),
      },
      {
        path: "newexerciseplan",
        element: (
          <ProtectedRoute>
            <PageTitle title="New Exercise Plan" />
            <NewExercisePlan />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <PageTitle title="Chat" />
            <Chat />
          </ProtectedRoute>
        ),
      },
      {
        path: "shoppinglist",
        element: (
          <ProtectedRoute>
            <PageTitle title="ShoppingList" />
            <ShoppingList />
          </ProtectedRoute>
        ),
      },
      {
        path: "recipes",
        element: (
          <ProtectedRoute>
            <PageTitle title="Recipes" />
            <Recipes />
          </ProtectedRoute>
        ),
      },
      {
        path: "myexerciseplans",
        element: (
          <ProtectedRoute>
            <PageTitle title="Exercise Plans" />
            <ExercisePlans />
          </ProtectedRoute>
        ),
      },
      {
        path: "myfoodplans",
        element: (
          <ProtectedRoute>
            <PageTitle title="Food Plans" />
            <FoodPlans />
          </ProtectedRoute>
        ),
      },
      {
        path: "newevaluation",
        element: (
          <ProtectedRoute>
            <PageTitle title="New Evaluation" />
            <NewEvaluation />
          </ProtectedRoute>
        ),
      },
      {
        path: "evaluationhistory",
        element: (
          <ProtectedRoute>
            <PageTitle title="Evaluation History" />
            <EvaluationHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "perscribedietplan",
        element: (
          <ProtectedRoute>
            <PageTitle title="Perscribe Diet" />
            <FoodPlanCreation />
          </ProtectedRoute>
        ),
      },
      {
        path: "perscribeexerciseplan",
        element: (
          <ProtectedRoute>
            <PageTitle title="Perscribe Exercise" />
            <ExercisepPlanCreation />
          </ProtectedRoute>
        ),
      },
      {
        path: "clients",
        element: (
          <ProtectedRoute>
            <PageTitle title="Clients Overview" />
            <ClientsOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "dietplandetails/:id",
        element: (
          <ProtectedRoute>
            <PageTitle title="Plano de Nutrição - Detalhes" />
            <FoodPlanDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "exerciseplandetails/:id",
        element: (
          <ProtectedRoute>
            <PageTitle title="Plano de Treino - Detalhes" />
            <ExercisePlanDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "foodplanoverview/:id",
        element: (
          <ProtectedRoute>
            <PageTitle title="Plano de Nutrição" />
            <FoodPlanOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "exerciseplanoverview/:id",
        element: (
          <ProtectedRoute>
            <PageTitle title="Plano de Exercício" />
            <ExercisePlanOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "clientoverview/:id",
        element: (
          <ProtectedRoute>
            <PageTitle title="Overview Client" />
            <IndividualClientOverview />
          </ProtectedRoute>
        ),
      },
      {
        path: "evaluations",
        element: (
          <ProtectedRoute>
            <PageTitle title="Avaliações Pendentes" />
            <ProEvaluations />
          </ProtectedRoute>
        ),
      },
      {
        path: "athleteprogress",
        element: (
          <ProtectedRoute>
            <PageTitle title="Progresso do Atleta" />
            <AthleteProgress />
          </ProtectedRoute>
        ),
      },
      {
        path: "devoverview",
        element: (
          <ProtectedRoute>
            <PageTitle title="Dev" />
            <DevOverview />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Fallback for Undefined Routes
  { path: "*", element: <ErrorPage /> },
]);
