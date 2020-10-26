import * as React from 'react';

import { RELEASE_FIELDS } from 'src/fragments';
import { useGQLQuery } from 'src/hooks';
import { ScrollingReleases } from 'src/components';
import { ReleaseT } from 'src/types';

const QUERY = `
	query {
		releases(
			sort: RECENTLY_ADDED
			asc: false
			page: 1
			perPage: 10
		) {
			results {
				${RELEASE_FIELDS}
			}
		}
	}
`;

type ResultType = { releases: { results: ReleaseT[] } };

export const RecentlyAdded: React.FC = () => {
  const { status, data } = useGQLQuery<ResultType>('recently-added', QUERY);

  const releases = data && status === 'success' ? data.releases.results : [];

  return (
    <div className="flex flex-col flex-no-wrap">
      <span className="sect-header">Recently Added</span>
      <ScrollingReleases releases={releases} />
    </div>
  );
};
