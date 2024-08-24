import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface AuthButtonProps {
  className?: string;
}

export default function AuthButton({ className = "" }: AuthButtonProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className={`flex items-center ${className}`}>
      {user ? (
        <div className="flex items-center flex-col gap-4">
          <h1 className="text-black text-xl">
            Welcome <br /> {user.identities?.[0].identity_data?.name}
          </h1>
          <div>
            
          <button
            onClick={handleSignOut}
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded transition duration-300"
          >
            Sign Out
          </button>
          </div>
        </div>
        
      ) : (
        <button
          onClick={handleSignIn}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded transition duration-300"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}
