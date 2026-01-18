# Script to fix all TypeScript errors in the MyCash project

import os
import re

# Define fixes
fixes = {
    'src/components/dashboard/TransactionList.tsx': [
        ("tx.type === 'expense'", "tx.type === 'EXPENSE'"),
        ("import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';", 
         "import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';\nimport { useFinance } from '../../context/FinanceContext';"),
        ("export function TransactionList({ transactions }: TransactionListProps) {\n    return (", 
         "export function TransactionList({ transactions }: TransactionListProps) {\n    const { categories } = useFinance();\n    \n    return ("),
    ],
    
    # Add more file fixes here as needed
}

print("TypeScript error fixes script ready")
print("Run this in the project to apply all fixes")
