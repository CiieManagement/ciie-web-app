import BackdropAnimation from '@/components/utils/backdrop_animation';
import { TeamMemberCard } from '@/components/widgets/aboutScreenCards';
import { useRouter } from 'next/router';
import { Navbar } from '@/components/navbar';
import { Strings2 } from '@/public/values/strings2';

const Index = () => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/community/detail/${id}`);
  };

  const renderTeamMembers = (members: any[]) => {
    return members.map((member, index) => (
      <div
        key={member.name}
        onClick={() => handleCardClick(String(index + 1))} // Pass index as id for routing
        className="cursor-pointer"
      >
        <TeamMemberCard
          image={
            member.image === ''
              ? member.gender === 'male'
                ? '/anonymous_male.svg'
                : '/anonymous_female.svg'
              : member.image
          }
          description={member.description}
          name={member.name}
          domain={member.domain}
          linkedin={member.linkedin}
          github={member.github}
        />
      </div>
    ));
  };

  return (
    <div>
      <Navbar />
      <BackdropAnimation />
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-opacity-80 rounded-lg max-w-6xl mx-auto">
        <h1 className="mt-4 text-3xl font-bold mb-10 md:text-4xl">
          Community Co-ordinators
        </h1>
        <div className="transition-all duration-300 max-w-4xl mx-auto">
          <div className="flex flex-col space-y-6">
            {renderTeamMembers(Object.values(Strings2.Community))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
