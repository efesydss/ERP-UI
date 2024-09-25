import { createFileRoute, redirect } from '@tanstack/react-router';
import { getRefreshToken, setAuthToken, tokenGlobal } from '@/utils/apiDefaults';
import { CashAccounts } from '@/components/Accounting/CashAccountList';

export const Route = createFileRoute('/_authenticated/accounting/cashAccounts/')({
  beforeLoad: async ({ context, location }) => {
    const { setUser } = context.app;
    const persistedUserInfo = localStorage.getItem('user');

    if (!persistedUserInfo) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }

    try {
      const accessToken = await getRefreshToken();
      if (!accessToken) {
        return redirect({ to: '/login' });
      }

      if (tokenGlobal !== accessToken) {
        setAuthToken(accessToken);
      }

      setUser({
        ...(persistedUserInfo && JSON.parse(persistedUserInfo))
      });
    } catch (err) {
      console.error('err', err);
      throw redirect({ to: '/login' });
    }
  },
  component: () => <CashAccounts />
});
