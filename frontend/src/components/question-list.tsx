import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User } from "lucide-react";
import type { Question } from "@/lib/types";

interface QuestionListProps {
  questions: Question[];
}

export default function QuestionList({ questions }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Questions Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There are no questions available at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Link
          to={`/questions/${question.id}`}
          key={question._id}
          className="block transition-all hover:scale-[1.01]"
        >
          <Card className="cursor-pointer hover:border-primary/50">
            <CardHeader>
              <CardTitle className="text-xl">{question.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <User className="h-3 w-3" />
                <span>{question.username}</span>
                <span>•</span>
                <span>{new Date(question.createdAt).toLocaleDateString()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-muted-foreground">
                {question.body}
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{question.answers?.length || 0}</span>
              </Badge>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
