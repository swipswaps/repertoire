import * as React from 'react';

import { useToasts } from 'react-toast-notifications';
import { useHistory, useParams } from 'react-router-dom';

const isValid = (id: string): boolean => /^\d+$/.test(id);

export const useId = (): number | null => {
  const history = useHistory();
  const { addToast } = useToasts();

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!isValid(id)) {
      addToast('Invalid release id.', { appearance: 'error' });
      history.push('/404');
    }
  }, [id, addToast, history]);

  return isValid(id) ? parseInt(id) : null;
};
