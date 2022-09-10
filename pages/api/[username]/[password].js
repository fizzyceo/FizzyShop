import { users } from '../../../lib/Data';

export default function handler(req, res) {
  const { username, password } = req.query;
  if (req.method === 'GET') {
    const fetchedUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (fetchedUser) {
      res.status(200).json(fetchedUser);
    } else {
      res.status(202).json({});
    }
  }
}
