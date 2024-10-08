import React from 'react'
import { Briefcase, ChartPie, Code, Cpu, Database, Server, Shield } from 'lucide-react'
import CategoryCard from '../Resuable/CategoryCard';
import Link from 'next/link';


const categories = [
    {
      icon: <Database className='w-8 h-8' />,
      name: 'Data Mining',
      className: 'hover:bg-blue-500 hover:text-white use-transition',
    },
    {
      icon: <Code className='w-8 h-8' />,
      name: 'Web Development',
      className: 'hover:bg-green-500 hover:text-white use-transition',
    },
    {
      icon: <Cpu className='w-8 h-8' />,
      name: 'Artificial Intelligence',
      className: 'hover:bg-red-500 hover:text-white use-transition',
    },
    {
      icon: <ChartPie className='w-8 h-8' />,
      name: 'Data Analysis',
      className: 'hover:bg-purple-500 hover:text-white use-transition',
    },
    {
      icon: <Shield className='w-8 h-8' />,
      name: 'Cybersecurity',
      className: 'hover:bg-yellow-500 hover:text-white use-transition',
    },
    {
      icon: <Server className='w-8 h-8' />,
      name: 'Cloud Computing',
      className: 'hover:bg-indigo-500 hover:text-white use-transition',
    },
    {
      icon: <Briefcase className='w-8 h-8' />,
      name: 'Project Management',
      className: 'hover:bg-orange-500 hover:text-white use-transition',
    }
  ];
  
  

export default function Explore() {
  return (
    <div className="w-full max-w-screen-xl flex items-center justify-center">
      <div className="w-full flex flex-col mx-auto">
      <h2 className="text-5xl font-bold text-center mt-20 mb-14">Explore</h2>
        <div className="my-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-10">
           {categories.map((category, index) => (
            <Link href={`/events/category/${category.name.replace(' ','-').toLowerCase()}`} key={index}>
             <CategoryCard icon={category.icon} name={category.name} className={category.className} />
            </Link>
           ))}
        </div>
      </div>
    </div>
  )
}
