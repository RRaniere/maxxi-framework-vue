import mock from '../mockAdapter';
import user1 from '../../assets/images/users/avatar-1.png';
import user2 from '../../assets/images/users/avatar-2.png';
import user3 from '../../assets/images/users/avatar-3.png';
import user4 from '../../assets/images/users/avatar-4.png';
import user5 from '../../assets/images/users/avatar-5.png';
import user6 from '../../assets/images/users/avatar-6.png';
import user7 from '../../assets/images/users/avatar-7.png';
import type { ChatTypes } from '@/types/chats/ChatTypes';

const ChatData: ChatTypes[] = [
  {
    id: 1,
    name: 'Alena',
    status: 'active',
    thumb: user1,
    recent: false,
    lastMessage: '2h ago',
    excerpt: 'Technical Department',
    unReadChatCount: 2,
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Keefe',
    status: 'active',
    thumb: user2,
    recent: true,
    lastMessage: '1:20 AM',
    excerpt: 'Support Executive',
    unReadChatCount: 3,
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.']
        },
        to: {
          id: 1,
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.'
          ],
          to: ['Please wait outside of the house.']
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Lazaro',
    status: 'active',
    thumb: user3,
    recent: false,
    lastMessage: 'Yesterday',
    excerpt: 'Investigator',
    unReadChatCount: 1,
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  },
  {
    id: 4,
    name: 'Hazle',
    status: 'do not disturb',
    thumb: user4,
    recent: true,
    lastMessage: '4/25/2021',
    excerpt: 'Teamworker',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.']
        },
        to: {
          id: 1,
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.'
          ],
          to: ['Please wait outside of the house.']
        }
      }
    ]
  },
  {
    id: 5,
    name: 'Herman Essertg',
    status: 'do not disturb',
    thumb: user5,
    recent: true,
    lastMessage: '4/25/2021',
    excerpt: 'Co-ordinator',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  },
  {
    id: 6,
    name: 'Wilhelmine Durrg',
    status: 'active',
    thumb: user6,
    recent: false,
    lastMessage: '4/25/2021',
    excerpt: 'Monitor Evaluator',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.']
        },
        to: {
          id: 1,
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.'
          ],
          to: ['Please wait outside of the house.']
        }
      }
    ]
  },
  {
    id: 7,
    name: 'Agilulf Fuxg',
    status: 'active',
    thumb: user7,
    recent: true,
    lastMessage: '4/25/2021',
    excerpt: 'Specialist',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  },
  {
    id: 8,
    name: 'Adaline Bergfalks',
    status: 'away',
    thumb: user6,
    recent: false,
    lastMessage: '4/25/2021',
    excerpt: 'Shaper',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.']
        },
        to: {
          id: 1,
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.'
          ],
          to: ['Please wait outside of the house.']
        }
      }
    ]
  },
  {
    id: 9,
    name: 'Eadwulf Beckete',
    status: 'away',
    thumb: user1,
    recent: false,
    lastMessage: '4/25/2021',
    excerpt: 'Implementer',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  },
  {
    id: 10,
    name: 'Midas',
    status: 'away',
    thumb: user2,
    recent: false,
    lastMessage: '4/25/2021',
    excerpt: 'Leader',
    chatHistory: [
      {
        from: {
          id: 0,
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.']
        },
        to: {
          id: 1,
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.'
          ],
          to: ['Please wait outside of the house.']
        }
      }
    ]
  },
  {
    id: 11,
    name: 'Uranus',
    status: 'active',
    thumb: user3,
    recent: false,
    lastMessage: '4/25/2021',
    excerpt: 'Facilitator',

    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  },
  {
    id: 12,
    name: 'Peahen',
    status: 'do not disturb',
    thumb: user4,
    recent: true,
    lastMessage: '4/25/2021',
    excerpt: 'One of the Graces.',

    chatHistory: [
      {
        from: {
          id: 0,
          from: ['The sky is clear', 'How was the math test?'],
          to: ['She always speaks to him in a loud voice.']
        },
        to: {
          id: 1,
          from: [
            'The memory we used to share is no longer coherent.',
            'The mysterious diary records the voice.',
            'The old apple revels in its authority.'
          ],
          to: ['Please wait outside of the house.']
        }
      }
    ]
  },
  {
    id: 13,
    name: 'Menelaus',
    status: 'away',
    thumb: user5,
    recent: false,
    lastMessage: '4/25/2021',
    excerpt: 'To stay',

    chatHistory: [
      {
        from: {
          id: 0,
          from: ['Tom got a small piece of pie.'],
          to: ["I'd rather be a bird than a fish.", 'They got there early, and they got really good seats.']
        },
        to: {
          id: 1,
          from: ['If I don’t like something, I’ll stay away from it.', 'I want more detailed information.'],
          to: ['We need to rent a room for our party.']
        }
      }
    ]
  }
];

mock.onGet('/api/data/chat/ChatData').reply(() => {
  return [200, ChatData];
});

export default ChatData;
