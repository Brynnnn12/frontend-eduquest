import { useDispatch, useSelector } from "react-redux";
import BadgeList from "./BadgeList";
import BadgeForm from "./BadgeForm";
import { openForm, closeForm, setSelectedBadge } from "../slices/badgeSlice";

const BadgeManagement = () => {
  const dispatch = useDispatch();
  const { isFormOpen, selectedBadge } = useSelector((state) => state.badge);

  const handleCreate = () => {
    dispatch(setSelectedBadge(null));
    dispatch(openForm());
  };

  const handleEdit = (badge) => {
    dispatch(setSelectedBadge(badge));
    dispatch(openForm());
  };

  const handleClose = () => {
    dispatch(closeForm());
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Badge Management</h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Badge
        </button>
      </div>

      <BadgeList onEdit={handleEdit} />

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <BadgeForm badge={selectedBadge} onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default BadgeManagement;
