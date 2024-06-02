interface Submission {
    email: string;
    name: string;
    regNo: string;
    uploadedAt: {
      seconds: number;
      nanoseconds: number;
    };
    year: string;
    fileUrl?: string;
    project?: string;
    children?: JSX.Element|JSX.Element[];
  }
  