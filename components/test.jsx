import { ref } from "firebase/database";
import { useDatabaseSnapshot } from "@react-query-firebase/database";
import { database } from "../firebase";

export function Test() {
    const dbRef = ref(database, "products");
    const products = useDatabaseSnapshot(["products"], dbRef);

    if (products.isLoading) {
        return <div>Loading...</div>;
    }

    // DataSnapshot
    const snapshot = products.data;

    let children = [];

    // Iterate the values in order and add an element to the array
    snapshot.forEach((childSnapshot) => {
        children.push(
            <div key={childSnapshot.key}>Product: {childSnapshot.val().name}</div>
        );
    });

    return <div>{children}</div>;
}