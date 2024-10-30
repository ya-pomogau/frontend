import { Meta, StoryObj } from "@storybook/react/*";
import { Label } from ".";

const meta = {
    title: 'uikit/FormElements/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {        
        className: {
            table: {
                disable: true,
            }
        },
        extClassName: {
            table: {
                disable: true,
            }
        },
        htmlFor: {
            table: {
                disable: true,
            }
        }
    }
} as Meta<typeof Label>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Test'
    }
}