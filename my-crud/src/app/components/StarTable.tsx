// Type definition for a Star object
type Star = {
  _id: string;         // Unique identifier for the star
  name: string;        // Name of the star
  description: string; // Description of the star
};

// StarTable component displays a table of stars
export default function StarTable({ stars }: { stars: Star[] }) {
  return (
    // Table container
    <table className="w-full mt-4 border text-sm">
      <thead>
        <tr className="bg-gray-100">
          {/* Table headers */}
          <th className="px-4 py-2 text-left">Nombre</th>
          <th className="px-4 py-2 text-left">Descripción</th>
        </tr>
      </thead>
      <tbody>
        {/* Render each star as a table row */}
        {stars.map((star) => (
          <tr key={star._id} className="border-t">
            <td className="px-4 py-2">{star.name}</td>
            <td className="px-4 py-2">{star.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}