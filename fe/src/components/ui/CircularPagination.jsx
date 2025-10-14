import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function CircularPagination({ active, setActive, totalPages }) {
  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: `rounded-full ${
      active === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
    }`,
  });

  const next = () => {
    if (active < totalPages) {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
        color="white"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton key={index + 1} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === totalPages}
        color="white"
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
