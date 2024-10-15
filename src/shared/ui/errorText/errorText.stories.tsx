import { Meta, StoryObj } from "@storybook/react/*";
import { ErrorText } from ".";

const meta = {
    title: 'uikit/FormElements/ErrorText',
    component: ErrorText,
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
} as Meta<typeof ErrorText>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        error: 'Test'
    }
}
