import { render, screen, fireEvent } from "@testing-library/react";
import ReadyToVoteChecklist from "@/components/ReadyToVoteChecklist";

describe("ReadyToVoteChecklist", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear();
  });

  it("renders all checklist items", () => {
    render(<ReadyToVoteChecklist />);
    
    expect(screen.getByText("Am I Ready to Vote?")).toBeInTheDocument();
    expect(screen.getByText("Are you registered to vote?")).toBeInTheDocument();
    expect(screen.getByText("Do you have your Voter ID or approved alternate ID ready?")).toBeInTheDocument();
    expect(screen.getByText("Do you know where your polling booth is?")).toBeInTheDocument();
    expect(screen.getByText("Is the election date saved in your calendar?")).toBeInTheDocument();
  });

  it("allows toggling items and updates progress", () => {
    render(<ReadyToVoteChecklist />);
    
    const regButton = screen.getByRole("checkbox", { name: /Are you registered to vote?/i });
    expect(regButton).toHaveAttribute("aria-checked", "false");
    
    // Toggle first item
    fireEvent.click(regButton);
    expect(regButton).toHaveAttribute("aria-checked", "true");
    
    // Progress bar should have updated (25%)
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "25");
  });

  it("shows success message when 100% complete", () => {
    render(<ReadyToVoteChecklist />);
    
    const items = screen.getAllByRole("checkbox");
    
    // Click all items
    items.forEach(item => {
      fireEvent.click(item);
    });

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "100");
    
    expect(screen.getByText(/Awesome! You are 100% ready to vote/i)).toBeInTheDocument();
  });
});
