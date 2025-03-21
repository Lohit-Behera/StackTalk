import type React from "react";

import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AppDispatch, RootState } from "@/store/store";
import { createQuestion } from "@/feature/questionSlice";

export default function AskQuestionPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(
    (state: RootState) => state.user.createUser.data.data.username
  );

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    console.log(title, body, username);

    const questionPromise = dispatch(createQuestion({ title, body, username }))
      .unwrap()
      .then((res) => {
        console.log(res);

        navigate(`/questions/${res.data._id}`);
      });
    toast.promise(questionPromise, {
      loading: "Creating question...",
      success: "Question created successfully",
      error: "Failed to create question",
    });
  };

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Ask a Question</CardTitle>
          <CardDescription>
            Be specific and imagine you're asking a question to another person
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="What's your question? Be specific."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                placeholder="Include all the information someone would need to answer your question"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[200px]"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/questions")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Your Question"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
