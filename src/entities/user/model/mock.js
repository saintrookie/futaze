export const MOCK_USERS = [
  { id: 'u-1', name: 'Jordan Blake', email: 'jordan.blake@example.com', role: 'Customer', status: 'active', joined: '2022-03-14' },
  { id: 'u-2', name: 'Priya Nair', email: 'priya.nair@example.com', role: 'Creator', status: 'active', joined: '2021-11-02' },
  { id: 'u-3', name: 'Marco Teixeira', email: 'marco.t@example.com', role: 'Creator', status: 'active', joined: '2020-06-19' },
  { id: 'u-4', name: 'Sana Ishikawa', email: 'sana.i@example.com', role: 'Customer', status: 'suspended', joined: '2023-01-08' },
  { id: 'u-5', name: 'Felix Moreau', email: 'felix.m@example.com', role: 'Creator', status: 'active', joined: '2019-09-23' },
  { id: 'u-6', name: 'Dara Osei', email: 'dara.o@example.com', role: 'Customer', status: 'active', joined: '2024-02-11' },
  { id: 'u-7', name: 'Emil Kowalski', email: 'emil.k@example.com', role: 'Admin', status: 'active', joined: '2019-01-04' },
  { id: 'u-8', name: 'Noor Haddad', email: 'noor.h@example.com', role: 'Customer', status: 'active', joined: '2023-07-30' },
];

/**
 * One demo persona per role, so the login screen can offer a real
 * one-click "try it as a Customer / Creator / Admin" experience instead of
 * a single account that happens to hold every permission at once.
 */
export const DEMO_USERS = {
  customer: {
    id: 'user-customer',
    name: 'Jordan Blake',
    email: 'jordan.blake@example.com',
    avatar: 'https://picsum.photos/seed/demo-customer/160/160',
    isCreator: false,
    isAdmin: false,
    plan: 'Pro Subscription',
    memberSince: '2022-03-14',
  },
  creator: {
    id: 'user-creator',
    name: 'Alina Voss',
    email: 'alina.voss@example.com',
    avatar: 'https://picsum.photos/seed/creator-0/160/160',
    isCreator: true,
    creatorUsername: 'alina-voss',
    isAdmin: false,
    plan: 'Free',
    memberSince: '2021-06-02',
  },
  admin: {
    id: 'user-admin',
    name: 'Emil Kowalski',
    email: 'emil.k@example.com',
    avatar: 'https://picsum.photos/seed/demo-admin/160/160',
    isCreator: false,
    isAdmin: true,
    plan: 'Internal',
    memberSince: '2019-01-04',
  },
};

export const DEMO_USER = DEMO_USERS.customer;
