import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ className }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${className && className}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </button>
  );
};
export default SubmitBtn;
