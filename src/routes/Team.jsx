import { Link } from 'react-router-dom';

const people = [
  {
    name: 'Rahmat Khairi',
    role: 'Member',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Rahmat&backgroundColor=ffdfbf',
    description: 'Four minds, four paths, one shared journey.'
  },
  {
    name: 'Indy',
    role: 'Member',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Indy&backgroundColor=b6e3f4',
    description: 'Together we learn, together we rise.'
  },
  {
    name: 'Trisha',
    role: 'Member',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Trisha&backgroundColor=ffb7b7',
    description: 'Small team. Big journey. Lasting impact.'
  },
  {
    name: 'Caleb',
    role: 'Member',
    imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Caleb&backgroundColor=c1f4c1',
    description: 'Learning as one, growing as four.'
  },
];

function Team() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-12 bg-recipe-50">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-recipe-800 dark:text-gray-700 mb-6">
          Meet Our Team
        </h1>
        <p className="text-xl text-recipe-700 max-w-3xl  dark:text-gray-700 mx-auto">
          We're a dynamic group of individuals who are passionate about reducing food waste
          and dedicated to delivering the best recipe solutions for our users.
        </p>
      </section>

      {/* Team Grid */}
      <section className="bg-white rounded-2xl dark:text-gray-700 shadow-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {people.map((person) => (
            <div 
              key={person.name}
              className="flex flex-col items-center p-6 bg-recipe-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden bg-white p-2 shadow-md">
                <img
                  src={person.imageUrl}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-recipe-800 dark:text-gray-700 mb-2">
                {person.name}
              </h3>
              <p className="text-recipe-500 dark:text-gray-700 mb-4">
                {person.role}
              </p>
              <p className="text-recipe-600 dark:text-gray-700 text-center text-sm">
                {person.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-recipe-800 dark:text-gray-700 mb-6">
            Our Mission
          </h2>
          <p className="text-recipe-700 dark:text-gray-700 mb-8">
            At Fridge Rescue, we're committed to helping households reduce food waste
            through innovative recipe suggestions. Our team combines technical expertise
            with a passion for sustainable cooking solutions.
          </p>
          <Link 
            to="/search" 
            className="inline-block bg-recipe-500 bg-gray-600 !text-white dark:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-recipe-600 hover:shadow-lg hover:-translate-y-0.5"
          >
            Try Our Recipe Finder
            </Link>
        </div>
      </section>
    </div>
  );
}

export default Team;