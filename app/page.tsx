'use client';

import { decrement, increment, reset } from '@/redux/features/counterSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetUsersQuery } from '@/redux/services/userApi';

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery();

  return (
    <main className="p-4">
      <div className="mb-16 text-center">
        <h4 className="mb-4">{count}</h4>
        <button className="border px-4" onClick={() => dispatch(increment())}>
          +
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="mx-4 border px-4">
          -
        </button>
        <button onClick={() => dispatch(reset())} className="border px-4">
          reset
        </button>
      </div>

      <div>
        <div className="text-center">
          <h2 className="text-lg font-bold mb-4">Users</h2>
          <p>{isLoading ? 'Loading...' : isFetching ? 'Fetching...' : ''}</p>
        </div>
        {data && (
          <table className="mx-auto">
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td className="px-4">{user.id}</td>
                  <td className="px-4">{user.name}</td>
                  <td className="px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
