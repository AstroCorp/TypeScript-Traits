import PriorityExample1 from "./classes/PriorityExample1";
import PriorityExample2 from "./classes/PriorityExample2";

describe("Method Priority in Traits", () => {
	test("class method should have priority over trait method", () => {
		const priorityExample1 = PriorityExample1.create({ name: "PriorityExample1" });

		expect(priorityExample1.log()).toBe("PriorityExample1 log");
		expect(priorityExample1.log()).not.toBe("PriorityLogger log");
	});

	test("trait method should have priority over base class method", () => {
		const priorityExample2 = PriorityExample2.create({ name: "PriorityExample2" });

		expect(priorityExample2.log()).toBe("PriorityLogger log");
		expect(priorityExample2.log()).not.toBe("PriorityBase log");
	});
});
