import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	// server component 이므로 useRouter (hooks)를 사용하지 못한다
	// action(직접적으로 database와 연결하는)을 사용
	const listing = await getListingById(params);
	const currentUser = await getCurrentUser();

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient listing={listing} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ListingPage;
