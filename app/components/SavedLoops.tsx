import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { toast } from "react-hot-toast";

interface Loop {
  id: number;
  videoId: string;
  startAt: number;
  endAt: number;
  playbackRate: number;
  title: string;
}

interface SavedLoopsProps {
  onLoadLoop: (loop: Loop) => void;
  user: User | null;
}

const SavedLoops: React.FC<SavedLoopsProps> = ({ onLoadLoop, user }) => {
  const [loops, setLoops] = useState<Loop[]>([]);

  useEffect(() => {
    if (user) {
      fetchLoops();
    } else {
      setLoops([]);
    }
  }, [user,loops]);

  const fetchLoops = async () => {
    const { data, error } = await supabase
      .from('loops')
      .select('*')
      .eq('user_id', user!.id);

    if (error) {
      console.error('Error fetching loops:', error);
    } else {
      setLoops(data || []);
    }
  };

  async function deleteLoop(id: number) {
    const { error } = await supabase.from("loops").delete().eq("id", id);

    if (error) {
      toast.error("Error deleting loop");
      console.error("Error deleting loop:", error);
    } else {
      fetchLoops();
      toast.success("Loop deleted successfully");
    }
  }

  return (
    <div className="mt-8 p-4 border-spacing-10 border-2 border-gray-200 shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Saved loops</h2>
      {user ? (
        loops.map((loop) => (
          <div
            key={loop.id}
            className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded"
          >
            <span>{loop.title}</span>
            <div>
              <button
                onClick={() => onLoadLoop(loop)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Load
              </button>
              <button
                onClick={() => deleteLoop(loop.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Please sign in to view your saved loops.</p>
      )}
    </div>
  );
};

export default SavedLoops;