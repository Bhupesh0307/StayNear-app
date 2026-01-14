import React from 'react';
import naman_img2 from "../../assets/naman_img2.jpg";
import Bhupesh_img from "../../assets/Bhupesh_img.jpg";

const teamMembers = [
  {
    name: 'Bhupesh Jha',
    position: 'Web Developer', 
    initials: 'BJ',
    image: Bhupesh_img
  },
  {
    name: 'Naman Aggarwal',
    position: 'Web Developer', 
    initials: 'NA',
    image: naman_img2
  },
];

export default function TeamGrid() {
  return (
    <div className="flex justify-center w-full">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-md mx-auto">
    {teamMembers.map((member) => (
      <div key={member.name} className="text-center">
        <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
        <p className="text-gray-600">{member.position}</p>
      </div>
    ))}
  </div>
</div>
  );
}
