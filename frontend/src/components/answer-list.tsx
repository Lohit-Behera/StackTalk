import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { User } from "lucide-react";

export interface Answer {
  _id: string;
  body: string;
  username: string;
  createdAt: string;
}

interface AnswerListProps {
  answers: Answer[];
}

export default function AnswerList({ answers }: AnswerListProps) {
  if (answers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardDescription>
            No answers yet. Be the first to answer!
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {answers.map((answer) => (
        <Card key={answer._id}>
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <User className="h-3 w-3" />
              <span>{answer.username}</span>
              <span>•</span>
              <span>{new Date(answer.createdAt).toLocaleDateString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{answer.body}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
