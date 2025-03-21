"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import AnswerList from "@/components/answer-list";
import { AppDispatch, RootState } from "@/store/store";
import { getQuestion } from "@/feature/questionSlice";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = useSelector(
    (state: RootState) => state.question.getQuestion.data
  );
  const username = useSelector(
    (state: RootState) => state.user.createUser.data.data.username
  );

  useEffect(() => {
    if (id) {
      dispatch(getQuestion(id as string));
    }
  }, [dispatch, id]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!answer.trim()) {
    //   toast({
    //     title: "Error",
    //     description: "Answer cannot be empty",
    //     variant: "destructive",
    //   })
    //   return
    // }

    // setIsSubmitting(true)

    // try {
    //   await dispatch(
    //     submitAnswer({
    //       questionId: id as string,
    //       body: answer,
    //       username,
    //     }),
    //   )
    //   setAnswer("")
    //   toast({
    //     title: "Success",
    //     description: "Your answer has been posted",
    //   })
    // } catch (error) {
    //   toast({
    //     title: "Error",
    //     description: "Failed to post answer. Please try again.",
    //     variant: "destructive",
    //   })
    // } finally {
    //   setIsSubmitting(false)
    // }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">
              Error Loading Question
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "Failed to load question. Please try again later."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Question Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The question you're looking for doesn't exist or has been removed.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{question.title}</CardTitle>
            <CardDescription>
              Asked by {question.username} on{" "}
              {new Date(question.createdAt).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none dark:prose-invert">
              <p>{question.body}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            {currentQuestion.answers?.length || 0}{" "}
            {currentQuestion.answers?.length === 1 ? "Answer" : "Answers"}
          </h2>

          <AnswerList answers={currentQuestion.answers || []} />

          {username && (
            <Card>
              <CardHeader>
                <CardTitle>Your Answer</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                  <Textarea
                    placeholder="Write your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="min-h-[150px]"
                    required
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Posting..." : "Post Your Answer"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
