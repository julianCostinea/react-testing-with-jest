/* eslint-disable testing-library/no-render-in-setup */
import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { Counter } from "./Counter";
import user from "@testing-library/user-event";

describe("initialized with defaultCount=0 and description=My Counter", () => {
  beforeEach(() => {
    render(<Counter defaultCount={0} description="My Counter" />);
  });
  it("renders counter at 0", () => {
    expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
  });

  it("renders title as My Counter", () => {
    expect(screen.getByText(/My Counter/)).toBeInTheDocument();
  });

  it("renders counter and when clicked renders 1", async() => {
    fireEvent.click(screen.getByRole("button", { name: "Add to Counter" }));
    await waitFor(()=>expect(screen.getByText("Current Count: 1")).toBeInTheDocument());
  });
  it("renders counter and when clicked renders -1", () => {
    fireEvent.click(
      screen.getByRole("button", { name: "Subtract from Counter" })
    );
    expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
  });
});

describe("initialized with defaultCount=10 and description=My Counter", () => {
  beforeEach(() => {
    render(<Counter defaultCount={10} description="My Counter" />);
  });
  it("renders Current Count = 10", () => {
    expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
  });

  it("renders title as My Counter", () => {
    expect(screen.getByText(/My Counter/)).toBeInTheDocument();
  });

  describe("when the incrementor changes to 5 and plus button is clicked", () => {
    beforeEach(async () => {
      await user.type(screen.getByLabelText(/Incrementor/), '5{arrowleft}{backspace}');
      await user.click(screen.getByRole('button', { name: 'Add to Counter' }));
    });
    it('renders "Current Count: 15"', async () => {
      await waitFor(()=>expect(screen.getByText("Current Count: 15")).toBeInTheDocument());
    });
    it('renders too big and will dissapear after 300ms', async () => {
      await waitForElementToBeRemoved(()=>screen.queryByText('I am too small'));
    });
  });

  describe("when the incrementor changes to 5 and minus button is clicked", () => {
    beforeEach(async () => {
      await user.type(screen.getByLabelText(/Incrementor/), '5{arrowleft}{backspace}');
      await user.click(screen.getByRole('button', { name: 'Subtract from Counter' }));
    });
    it('renders "Current Count: 5"', () => {
      expect(screen.getByText('Current Count: 5')).toBeInTheDocument();
    });
  });
});
