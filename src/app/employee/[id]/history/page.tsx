import EmployeeHistory from "@/components/employee/EmployeeHistory";

type Props = {
  params: {
    id: string;
  };
};

const page = ({ params }: Props) => {
  return <EmployeeHistory employeeId={params.id} />;
};

export default page;
