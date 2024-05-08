import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: NoSelection,
});

function NoSelection() {
  return (
    <div className="p-2 text-center">
        <h3>Hello, World!</h3>
        <h5>Please search or select a country to view volcanos</h5>
        <h6>
          You can also log in or create an account to view more detailed
          information
        </h6>
    </div>
  );
}
