import type React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { fetchCreateUser } from "@/feature/userSlice";
import { toast } from "sonner";

export default function HomePage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Username cannot be empty");
      return;
    }

    const createUserPromise = dispatch(fetchCreateUser(name))
      .unwrap()
      .then(() => {
        navigate("/questions");
      });
    toast.promise(createUserPromise, {
      loading: "Creating user...",
      success: "User created successfully",
      error: "Failed to create user",
    });
  };

  return (
    <div className="flex min-h-[93vh] w-full items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-lg ">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome to StackTalk
          </CardTitle>
          <CardDescription>
            A community where you can ask questions and share knowledge
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enter a username to get started
                </label>
                <Input
                  id="username"
                  placeholder="Your unique username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full mt-4">
              Continue to Questions
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
