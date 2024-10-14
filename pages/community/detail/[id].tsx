import { useRouter } from 'next/router';
import { Strings2 } from '@/public/values/strings2';
import { Navbar } from '@/components/navbar';
import Image from 'next/image';
import BackdropAnimation from '@/components/utils/backdrop_animation';

const CommunityDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch the relevant community member data using the id
  const member = Strings2.Community[id as unknown as keyof typeof Strings2.Community];

  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <BackdropAnimation />
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-8 bg-opacity-80 rounded-lg max-w-6xl mx-auto">
        <h1 className="mt-4 text-3xl font-bold mb-10 md:text-4xl">
          {member.name}
        </h1>
        <Image
          src={
            member.image === ''
              ? member.gender === 'male'
                ? '/anonymous_male.svg'
                : '/anonymous_female.svg'
              : member.image
          }
          width={100}
          height={100}
          alt={member.name}
          className="w-40 h-40 mb-6 rounded-full"
        />
        <p className="text-xl font-semibold">{member.domain}</p>
        <p className="mt-4">{member.description}</p>
        <div className="mt-6 flex space-x-4">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" className="text-blue-500">
              LinkedIn
            </a>
          )}
          {member.github && (
            <a href={member.github} target="_blank" className="text-gray-600">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
