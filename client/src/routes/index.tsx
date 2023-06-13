import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "@/pages/landing-page";
import { ResetPassword } from "@/pages/reset-password";

import {
  AuthLayout,
  Login,
  Register,
  AppLayout,
  NotesView,
  NotebooksView,
  TopicsView,
  TagsView,
  TopicView,
  TasksView,
} from "@/components";

export const AppRoutes = () => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* landing page */}
        <Route key={pathname} index element={<LandingPage />} />

        {/* auth */}
        <Route key={pathname} element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          key={pathname}
          path="reset-password"
          element={<ResetPassword />}
        />

        {/* app */}
        <Route key={pathname} element={<AppLayout />} path="/app">
          {/* notes */}
          <Route path="notes">
            <Route index element={<NotesView notesType="notes" />} />

            <Route path="favs" element={<NotesView notesType="favs" />} />

            <Route path="trash" element={<NotesView notesType="trash" />} />
          </Route>

          {/* tasks */}
          <Route path="tasks" element={<TasksView />} />

          {/* notebooks */}
          <Route path="notebooks">
            <Route index element={<NotebooksView />} />

            <Route path=":id" element={<TopicsView />}>
              <Route path=":topicId" element={<TopicView />} />
            </Route>
          </Route>

          {/* tags */}
          <Route path="tags">
            <Route index element={<TagsView />} />
          </Route>

          <Route path="*" element={<Navigate to="notes" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};
