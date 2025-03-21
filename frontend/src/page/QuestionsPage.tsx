"use client";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlusCircle, User } from "lucide-react";
import QuestionList from "@/components/question-list";

export default function QuestionsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { questions, status, error } = useSelector(
    (state: RootState) => state.questions
  );
  const { username } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!username) {
      router.push("/");
      return;
    }

    dispatch(fetchQuestions());
  }, [dispatch, router, username]);

  if (!username) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Questions</h1>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/my-questions">
                <User className="mr-2 h-4 w-4" />
                My Questions
              </Link>
            </Button>
            <Button asChild>
              <Link href="/ask">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ask Question
              </Link>
            </Button>
          </div>
        </div>

        {status === "loading" && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {status === "failed" && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">
                Error Loading Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {error || "Failed to load questions. Please try again later."}
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => dispatch(fetchQuestions())}>Retry</Button>
            </CardFooter>
          </Card>
        )}

        {status === "succeeded" && <QuestionList questions={questions} />}
      </div>
    </div>
  );
}
