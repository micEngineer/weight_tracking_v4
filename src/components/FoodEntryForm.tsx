import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { FoodEntry } from '../types';

interface FoodEntryFormProps {
  onSubmit: (entry: Omit<FoodEntry, 'id'>) => void;
}

export function FoodEntryForm({ onSubmit }: FoodEntryFormProps) {
  const [meal, setMeal] = useState<FoodEntry['meal']>('breakfast');
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date(),
      meal,
      description,
      calories: calories ? Number(calories) : undefined,
    });
    setDescription('');
    setCalories('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">食事の種類</label>
          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value as FoodEntry['meal'])}
            className="w-full rounded-lg border-gray-200 focus:border-violet-500 focus:ring-violet-500 transition-colors"
          >
            <option value="breakfast">朝食</option>
            <option value="lunch">昼食</option>
            <option value="dinner">夕食</option>
            <option value="snack">間食</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">食事内容</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-violet-500 focus:ring-violet-500 transition-colors"
            placeholder="例：ごはん、味噌汁、焼き魚"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">カロリー (任意)</label>
          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-violet-500 focus:ring-violet-500 transition-colors"
            placeholder="例：500"
          />
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50">
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          記録を追加
        </button>
      </div>
    </form>
  );
}