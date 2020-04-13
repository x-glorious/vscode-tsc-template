type AsyncAction = () => Promise<void>

export default async (actions: AsyncAction[], errorDel: (error: string) => void) => {
    for (const action of actions) {
        await action().catch(errorDel)
    }
}
